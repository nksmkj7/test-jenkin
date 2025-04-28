pipeline {
    agent any
    parameters {
        gitParameter(
            name: 'BRANCH_NAME',
            type: 'PT_BRANCH',
            description: 'Select the Git branch to build',
            branchFilter: 'origin/*',
            defaultValue: 'origin/main',
            selectedValue: 'NONE',
            sortMode: 'DESCENDING_SMART'
        )
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    echo "Selected branch: ${params.BRANCH_NAME}"
                }
            }
        }

        stage('Build') {
            steps {
                echo "Building the selected branch: ${params.BRANCH_NAME}"
            }
        }
    }
}
