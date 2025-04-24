pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'simple-node-app'
        DOCKER_TAG = "${BUILD_NUMBER}"
    }

     parameters {
        gitParameter name: 'BRANCH_NAME',
                    type: 'PT_BRANCH',
                    defaultValue: 'main',
                    description: 'Select the branch to build',
                    branchFilter: 'origin/(.*)',
                    selectedValue: 'DEFAULT',
                    sortMode: 'DESCENDING_ALPHABETICALLY'
    }

    stages {
         stage('Clone') {
            steps {
                checkout([$class: 'GitSCM',
                    branches: [[name: "${params.BRANCH_NAME}"]],
                    userRemoteConfigs: [[url: 'YOUR_REPO_URL_HERE']]
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
                    sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Stop existing container if running
                    sh "docker stop ${DOCKER_IMAGE} || true"
                    sh "docker rm ${DOCKER_IMAGE} || true"
                    
                    // Run new container
                    sh "docker run -d --name ${DOCKER_IMAGE} -p 4444:4444 ${DOCKER_IMAGE}:${DOCKER_TAG}"
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
