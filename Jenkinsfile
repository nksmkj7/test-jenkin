pipeline {
    agent any
    parameters {
        gitParameter(
            name: 'BRANCH_NAME',                    // This must match ${params.BRANCH_NAME}
            type: 'PT_BRANCH',                      
            description: 'Select the Git branch to build',
            branchFilter: 'origin/(.*)',            // Changed to capture all branches
            defaultValue: 'origin/main',
            selectedValue: 'DEFAULT',               // Changed from NONE to DEFAULT
            sortMode: 'DESCENDING_ALPHABETICALLY'   // More intuitive sorting
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
