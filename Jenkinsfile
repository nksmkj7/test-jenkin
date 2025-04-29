pipeline {
    agent any
    
    environment {
        COMMIT_ID = sh(script: "git log -n 1 --pretty=format:'%h'", returnStdout: true).trim()
    }
    
    options {
        skipDefaultCheckout(false)
        disableConcurrentBuilds()
    }
    
    stages {
        stage('Clean workspace') {
            steps {
                deleteDir()
            }
        }
        
        stage('Code checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: "${params.BRANCH}"]],
                    gitTool: 'Default',
                    userRemoteConfigs: [[
                        credentialsId: 'companion-jenkins-ci',
                        url: 'https://github.com/nksmkj7/test-jenkin'
                    ]]
                ])
            }
        }
        
        stage('Build') {
            steps {
                echo "hello from build"
            }
        }
        
        stage('Lint') {
            steps {
                catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
                    echo "hello from lint"
                }
            }
        }
        
        stage('Test') {
            steps {
                catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
                    echo "hello from test"
                }
            }
        }
        
        
        // stage('Docker Build') {
        //     steps {
        //         script {
        //             def imageTag = env.BUILD_NUMBER + '.0_' + env.COMMIT_ID
                    
        //             sh """
        //             cd \${WORKSPACE}
        //             cp ~/envsettings/.env.catalog-service .env
        //             docker build -f ./docker/Dockerfile -t catalog-service:${imageTag} .
        //             """
        //         }
        //     }
        // }
        
        // stage('Docker Run') {
        //     steps {
        //         script {
        //             def imageTag = env.BUILD_NUMBER + '.0_' + env.COMMIT_ID
                    
        //             sh """
        //             docker container stop catalog-service || true
        //             docker container rm catalog-service || true
        //             docker run -d -p 30090:3000 --name catalog-service --restart unless-stopped catalog-service:${imageTag}
        //             """
        //         }
        //     }
        // }
    }
    
    post {
        always {
            deleteDir()
        }
        failure {
            echo "hello from failure"
        }
        success {
            echo "hello from success"
        }
    }
}
