import SFTPClient from "ssh2-sftp-client";

class SFTPService {
    private sftp: SFTPClient;
    private connected: boolean = false;

    constructor() {
        this.sftp = new SFTPClient();
    }

    async connect(): Promise<void> {
        if (this.connected) return;

        try {
            await this.sftp.connect({
                host: process.env.VPS_HOST as string,
                username: process.env.VPS_USER as string,
                password: process.env.VPS_PASS as string,
            });
            this.connected = true;
            console.log("SFTP connected successfully.");
        } catch (error) {
            console.error("SFTP connection error:", error);
            throw new Error("Failed to connect to SFTP");
        }
    }

    async uploadFile(buffer: Buffer, remotePath: string): Promise<void> {
        try {
            await this.sftp.put(buffer, remotePath);
            console.log(`File uploaded to ${remotePath}`);
        } catch (error) {
            console.error("File upload error:", error);
            throw new Error("Failed to upload file");
        }
    }

    async disconnect(): Promise<void> {
        if (this.connected) {
            await this.sftp.end();
            this.connected = false;
            console.log("SFTP connection closed.");
        }
    }

    getClient(): SFTPClient {
        return this.sftp;
    }
}

export default new SFTPService();
