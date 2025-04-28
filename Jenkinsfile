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

                }
            }
        }

        stage('Build') {
            steps {
                checkout scm
                sh """
                    git checkout ${params.BRANCH_NAME}
                    git branch
                """
                echo "Checked out branch: ${params.BRANCH_NAME}"
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
