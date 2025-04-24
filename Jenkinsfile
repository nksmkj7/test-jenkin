pipeline {
    agent any

    parameters {
        string(name: 'BRANCH_NAME', defaultValue: 'main', description: 'Enter the branch to build')
    }

    environment {
        DOCKER_IMAGE = 'simple-node-app'
    }

    stages {
        stage('Clone') {
            steps {
                checkout([$class: 'GitSCM',
                    branches: [[name: "${params.BRANCH_NAME}"]],
                    userRemoteConfigs: [[url: 'https://github.com/YOUR_USER/YOUR_REPO.git']]
                ])
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build --if-present'
            }
        }

        // stage('Test') {
        //     steps {
        //         sh 'npm test --if-present'
        //     }
        // }

        stage('Docker Build') {
            steps {
                script {
                    def dockerTag = "${env.BUILD_NUMBER}"
                    sh "docker build -t ${DOCKER_IMAGE}:${dockerTag} ."
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    def dockerTag = "${env.BUILD_NUMBER}"
                    sh "docker stop ${DOCKER_IMAGE} || true"
                    sh "docker rm ${DOCKER_IMAGE} || true"
                    sh "docker run -d --name ${DOCKER_IMAGE} -p 4444:4444 ${DOCKER_IMAGE}:${dockerTag}"
                }
            }
        }
    }

    post {
        failure {
            echo 'Pipeline failed!'
        }
        success {
            echo 'Pipeline succeeded!'
        }
    }
}
