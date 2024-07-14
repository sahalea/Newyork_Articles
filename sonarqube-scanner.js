const scanner = require("sonarqube-scanner");
scanner(
    {
        serverUrl: "http://localhost:9000",
        Options:{
            'sonar.login': 'admin',
            'sonar.password': 'admin',
            'sonar.projectName': 'ny-times',
            'sonar.projectDescription': 'ny-times',
            'sonar.sourceEncoding': 'UTF-8',
            'sonar.sources': './src',
            'sonar.test.inclusions': '**/*.test.tsx,**/*.test.ts',
            'sonar.exclusions': '**/*.test.tsx',
            'sonar.tests':"./src",
            'sonar.testExecutionReportPaths': 'test-report.xml',
            'sonar.javascript.lcov.reportPaths': './coverage/lcov.info'
        },
    },
    () => process.exit()
)