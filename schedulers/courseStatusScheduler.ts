import { CronJob } from 'cron';
import { CourseStatusService } from '../services/courseStatusService';

/**
 * Scheduler to update course status and payment status every August
 */
export class CourseStatusScheduler {
    private courseStatusService: CourseStatusService;
    private cronJob: CronJob;

    constructor() {
        this.courseStatusService = new CourseStatusService();

        // Schedule to run on August 1st at 00:00:00 every year
        // Cron format: second minute hour day-of-month month day-of-week
        this.cronJob = new CronJob('0 0 0 1 8 *', async () => {
            console.log('Running scheduled course status update - August 1st');
            await this.updateCourseStatus();
        });
    }

    /**
     * Start the scheduler
     */
    public start(): void {
        this.cronJob.start();
        console.log('Course status scheduler started');
    }

    /**
     * Stop the scheduler
     */
    public stop(): void {
        this.cronJob.stop();
        console.log('Course status scheduler stopped');
    }

    /**
     * Manually trigger the course status update
     */
    public async updateCourseStatus(): Promise<void> {
        try {
            await this.courseStatusService.updateAllStudentsCourseStatus();
        } catch (error) {
            console.error('Failed to update course statuses:', error);
        }
    }
}