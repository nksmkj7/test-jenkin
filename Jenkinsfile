pipeline {
    agent any

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

        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build --if-present'
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
