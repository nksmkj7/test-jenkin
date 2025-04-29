pipeline {
    agent any
    
    parameters {
        string(name: 'BRANCH', description: 'Branch to Deploy', defaultValue: 'develop')
    }
    
    environment {
        STATUS = 'STARTED'
        CCODE = 'warning'
        GIT_COMMIT_HASH = 'Unable to fetch, yet to git clone !!'
    }
    
    stages {
        stage('Clean workspace before build') {
            steps {
                deleteDir()
            }
        }
        
        stage('Code checkout') {
            steps {
                script {
                    STATUS = 'FAILED'
                    CCODE = 'danger'
                }
                
                checkout([$class: 'GitSCM',
                    branches: [[name: "*/${params.BRANCH}"]],
                    gitTool: 'Default',
                    userRemoteConfigs: [[credentialsId: 'companion-jenkins-ci',
                    url: 'https://github.com/nksmkj7/test-jenkin']]
                ])
                
                script {
                    GIT_COMMIT_HASH = sh(script: "git log -n 1 --pretty=format:'%h'", returnStdout: true).trim()
                }
            }
        }
        
        stage('Build') {
            steps {
                echo 'Building..'
            }
        }
        
        stage('Lint') {
            steps {
                echo 'Linting..'
            }
        }
        
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        
        /* Commented out as in original file
        stage('Publish Reports') {
            steps {
                sh 'make publish_sonar'
            }
        }
        
        stage('Check_Quality_Gates') {
            steps {
                withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'sonar-mosaic',
                    usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {
                    sh "make check_quality_gates"
                }
            }
        }
        */
        
    }
    
    post {
        always {
            echo "Status : ${STATUS}\nRepo : mosaic-ams-service , Branch : ${params.BRANCH} , Commit : ${GIT_COMMIT_HASH}\nURL : ${env.BUILD_URL}"
        }
        failure {
            script {
                echo "Build failed"
            }
        }
    }
}
