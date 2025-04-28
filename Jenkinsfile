pipeline {
    agent any


    stages {
        stage('Clean workspace') {
            steps {
                deleteDir()
            }
        }

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
