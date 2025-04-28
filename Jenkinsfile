pipeline {
    agent any


    stages {
        stage('Clean workspace') {
            steps {
                deleteDir()
                // checkout scm
            }
        }

        stage('Checkout') {
            steps {
                script {
                    echo "Selected branch: ${params.BRANCH_NAME}"
                    checkout scm
                   


                }
            }
        }

        stage('Build') {
            steps {
                echo "Building the selected branch: ${params.BRANCH_NAME}"
            }
        }

        stage('Docker Build') {
            steps {
                script {
                    def commitId = sh(returnStdout: true, script: "git rev-parse --short HEAD").trim()
                    def imageTag = "${env.BUILD_NUMBER}-${commitId}"
                    
                    sh """
                        docker build -t simple-node-app:${imageTag} .
                    """
                }
            }
        }
    }
}
