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
                    // Echo the selected branch for debugging
                    echo "Selected branch: ${params.BRANCH_NAME}"
                    
                    // Checkout the selected branch
                    checkout scm
                    sh "git checkout ${params.BRANCH_NAME}"
                }
            }
        }

        stage('Clean workspace') {
            steps {
                deleteDir()
            }
        }

        stage('Build') {
            steps {
                echo 'Building the application...'
                // sh 'npm install'
                // sh 'npm run build --if-present'
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

    post {
        always {
            cleanWs()
        }
    }
}
