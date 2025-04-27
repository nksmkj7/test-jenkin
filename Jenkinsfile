pipeline {
    agent any
    parameters {
        gitParameter(
            name: 'BRANCH_NAME', 
            type: 'PT_BRANCH', 
            description: 'Select the Git branch to build', 
            branchFilter: 'origin/*', 
            defaultValue: 'origin/master', 
            selectedValue: 'DEFAULT'
        )
    }
    
    stages {
        stage('Checkout') {
            steps {
                script {
                    // Echo the selected branch
                    echo "Selected branch: ${params.BRANCH_NAME}"
                    
                    // Checkout the selected branch
                    checkout scm
                    sh "git checkout ${params.BRANCH_NAME}"
                }
            }
        }

        stage('Build') {
            steps {
                // Your build steps here
                echo "Building the selected branch: ${params.BRANCH_NAME}"
            }
        }
    }
}
