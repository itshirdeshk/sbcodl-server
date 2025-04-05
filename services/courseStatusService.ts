import { PrismaClient, CourseStatus, PaymentStatus, DurationType } from '@prisma/client';
import { differenceInMonths, differenceInYears } from 'date-fns';
import prisma from '../prisma/prismaInstance';

/**
 * Service to handle course status and payment updates
 */
export class CourseStatusService {
  /**
   * Updates all students' course status and payment status based on course duration
   */
  public async updateAllStudentsCourseStatus(): Promise<void> {
    try {
      // Get all students with ongoing courses
      const students = await prisma.student.findMany({
        where: {
          courseStatus: CourseStatus.ONGOING
        },
        select: {
          id: true,
          courseId: true,
          createdAt: true,
          courseStatus: true,
          paymentStatus: true
        }
      });

      const currentDate = new Date();
      
      // Process each student
      for (const student of students) {
        // Get the course details to check duration
        const course = await prisma.course.findUnique({
          where: { id: student.courseId },
          select: { 
            duration: true,
            durationType: true
          }
        });

        if (!course || !course.duration || !course.durationType) {
          console.log(`Course information incomplete for student ${student.id}`);
          continue;
        }

        // Calculate if course should be completed
        const shouldBeCompleted = this.isCourseCompleted(
          student.createdAt,
          currentDate,
          course.duration,
          course.durationType
        );

        if (shouldBeCompleted) {
          // Update course status to COMPLETED
          await prisma.student.update({
            where: { id: student.id },
            data: { courseStatus: CourseStatus.COMPLETED }
          });
        } else {
          // Course is still ongoing, set payment status to PENDING for the new academic year
          await prisma.student.update({
            where: { id: student.id },
            data: { paymentStatus: PaymentStatus.PENDING }
          });
        }
      }

      console.log('Successfully updated all students course status and payment status');
    } catch (error) {
      console.error('Error updating student course statuses:', error);
      throw error;
    }
  }

  /**
   * Determines if a course is completed based on enrollment date and course duration
   */
  private isCourseCompleted(
    enrollmentDate: Date,
    currentDate: Date,
    duration: number,
    durationType: DurationType
  ): boolean {
    if (durationType === DurationType.YEAR) {
      const yearsPassed = differenceInYears(currentDate, enrollmentDate);
      return yearsPassed >= duration;
    } else if (durationType === DurationType.MONTH) {
      const monthsPassed = differenceInMonths(currentDate, enrollmentDate);
      return monthsPassed >= duration;
    }
    
    return false;
  }
}