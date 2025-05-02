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
                echo 'latest change Building..'
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
        // Use withCredentials if authentication is needed
        withCredentials([usernamePassword(credentialsId: 'for-companion-site', 
                                        usernameVariable: 'GIT_USERNAME', 
                                        passwordVariable: 'GIT_PASSWORD')]) {
            def branchOutput = sh(
                script: """
                    curl -s -u ${GIT_USERNAME}:${GIT_PASSWORD} \
                    'https://api.github.com/repos/nksmkj7/test-jenkin/branches' | \
                    grep -o '"name": "[^"]*' | \
                    cut -d'"' -f4
                """,
                returnStdout: true
            ).trim()
            
            branches = branchOutput.split('\n')
            echo "Available branches:"
            branches.each { branch ->
                echo "  - ${branch}"
            }
        }

        if (branches.size() == 0) {
            echo "No branches found, using fallback branches"
            branches = ['main', 'develop']
        }
    } catch (err) {
        echo "Error getting branches: ${err}"
        branches = ['main', 'develop']
    }
    return branches
}
