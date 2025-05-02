pipeline {
    agent any

    parameters {
        choice(
            name: 'BRANCH',
            choices: ['main', 'develop', 'feature-x'],
            description: 'Select the branch to build'
        )
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
                    userRemoteConfigs: [[
                        credentialsId: 'for-companion-site',
                        url: 'https://github.com/nksmkj7/test-jenkin'
                    ]]
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
    }

    post {
        always {
            echo "Cleaning up workspace"
        }
        failure {
            echo "Build failed"
        }
    }
}
