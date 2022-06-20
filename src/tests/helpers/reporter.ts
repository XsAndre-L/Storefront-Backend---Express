import {
    DisplayProcessor,
    SpecReporter,
    StacktraceOption,
} from "jasmine-spec-reporter";

function getTime() {
    const now = new Date();
    return now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
}

class CustomProcessor extends DisplayProcessor {
    public displayJasmineStarted(
        info: jasmine.JasmineStartedInfo,
        log: string
    ): string {
        return `${getTime()} - ${log}`;
    }
}

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(
    new SpecReporter({
        spec: {
            displayStacktrace: StacktraceOption.NONE,
        },
        customProcessors: [CustomProcessor],
    })
);
