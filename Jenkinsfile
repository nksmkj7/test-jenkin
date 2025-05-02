pipeline {
    agent any
    
    parameters {
        choice(
            name: 'BRANCH',
            choices: evaluateGitBranches(),
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
                    userRemoteConfigs: [[credentialsId: 'for-companion-site',
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
            echo "Cleaning up workspace"
        }
        failure {
            script {
                echo "Build failed"
            }
        }
    }
}

def evaluateGitBranches() {
    def branches = []
    try {
        def branchOutput = sh(
            script: 'git ls-remote --heads https://github.com/nksmkj7/test-jenkin | cut -d "/" -f 3',
            returnStdout: true
        ).trim()
        branches = branchOutput.split('\n')
        
        echo "Available branches:"
        branches.each { branch ->
            echo "  - ${branch}"
        }
        
        if (branches.size() == 0) {
            branches = ['main', 'develop']  // fallback if no branches found
        }
    } catch (err) {
        echo "Error getting branches: ${err}"
        branches = ['main', 'develop']  // fallback branches
    }
    return branches
}
