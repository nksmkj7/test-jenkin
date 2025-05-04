properties([
    parameters([
        choice(
            name: 'BRANCH',
            choices: getGitBranches(),
            description: 'Select the branch to build'
        )
    ])
])

node {
    stage('Clean workspace before build') {
        deleteDir()
    }

    stage('Checkout Code') {
        checkout([$class: 'GitSCM',
            branches: [[name: "*/${params.BRANCH}"]],
            userRemoteConfigs: [[
                url: 'https://github.com/nksmkj7/test-jenkin.git',
                credentialsId: 'for-companion-site'
            ]]
        ])

        env.GIT_COMMIT_HASH = sh(script: "git log -n 1 --pretty=format:'%h'", returnStdout: true).trim()
        echo "Checked out commit: ${env.GIT_COMMIT_HASH}"
    }

    stage('Build') {
        // Remove 'steps' block - not needed in scripted pipeline
        script {
            // Build Docker image
            def imageTag = "${env.BUILD_NUMBER}-${env.GIT_COMMIT_HASH}"
            sh """
                docker build -t simple-node-app:${imageTag} .
                echo "Built Docker image: simple-node-app:${imageTag}"
            """
        }
    }

    stage('Docker Run') {
        script {
            try {
                // Stop and remove existing container if it exists
                sh '''
                    CONTAINER_NAME="simple-node-app"
                    if docker ps -a | grep -q $CONTAINER_NAME; then
                        echo "Stopping and removing existing container..."
                        docker stop $CONTAINER_NAME || true
                        docker rm $CONTAINER_NAME || true
                    fi
                '''
                
                // Run new container
                sh """
                    docker run -d \
                        --name simple-node-app \
                        -p 4444:4444 \
                        simple-node-app:${env.DOCKER_IMAGE_TAG}
                """
                
                echo "Container started successfully"
                
                // Wait for container to be ready
                sh 'sleep 10'
                
                // Verify container is running
                sh '''
                    if ! docker ps | grep -q simple-node-app; then
                        echo "Container failed to start"
                        exit 1
                    fi
                '''
            } catch (error) {
                echo "Failed to run Docker container: ${error}"
                throw error
            }
        }
    }

    stage('Lint') {
        echo 'Linting...'
    }

    stage('Test') {
        echo ' scripted Testing...'
    }
}

def getGitBranches() {
    def branches = []
    try {
        node {
            try {
                withCredentials([usernamePassword(credentialsId: 'for-companion-site', 
                                                usernameVariable: 'GIT_USERNAME', 
                                                passwordVariable: 'GIT_PASSWORD')]) {
                    def output = sh(
                        script: '''
                            curl -s -u $GIT_USERNAME:$GIT_PASSWORD \
                            https://api.github.com/repos/nksmkj7/test-jenkin/branches | \
                            grep -o '"name": "[^"]*' | cut -d'"' -f4
                        ''',
                        returnStdout: true
                    ).trim()
                    
                    echo "Branches fetched: ${output}"
                    
                    if (output) {
                        branches = output.tokenize('\n')
                    } else {
                        echo "No output received from GitHub API"
                    }
                }
            } catch (credentialsError) {
                echo "Error with credentials or GitHub API call: ${credentialsError}"
                throw credentialsError
            }
        }
    } catch (error) {
        echo "Error in getGitBranches: ${error}"
        branches = ['main', 'develop'] // fallback branches
        echo "Using fallback branches: ${branches}"
    }

    if (branches.isEmpty()) {
        echo "No branches found, using fallback branches"
        branches = ['main', 'develop']
    }

    return branches
}
