pipeline {
    agent any
    
    parameters {
        gitParameter(
            name: 'BRANCH_NAME',
            type: 'PT_BRANCH',
            description: 'Select the Git branch to build',
            branchFilter: 'origin/*',
            defaultValue: 'origin/main',
            selectedValue: 'DEFAULT',
            sortMode: 'DESCENDING_SMART'
        )
    }

    stages {
        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: "${params.BRANCH_NAME}"]],
                    userRemoteConfigs: [[
                        url: 'https://github.com/nksmkj7/test-jenkin'
                    ]]
                ])
            }
        }

        
    }
}
