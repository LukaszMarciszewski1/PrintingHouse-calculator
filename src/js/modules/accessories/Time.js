export class Time {
    constructor(nowTime) {
        this.nowTime = nowTime;
        this.getTime()
    }
    // time at the local clock
    getTime() {
        setInterval(() => {
            const time = new Date();
            const seconds = time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
            const minutes = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
            const hours = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
            this.nowTime.textContent = `${hours}:${minutes}:${seconds}`
        }, 1000);
    }
}