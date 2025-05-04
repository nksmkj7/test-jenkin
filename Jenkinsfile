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
        steps {
            script {
                // Build Docker image
                def imageTag = "${env.BUILD_NUMBER}-${env.GIT_COMMIT_HASH}"
                sh """
                    docker build -t simple-node-app:${imageTag} .
                    echo "Built Docker image: simple-node-app:${imageTag}"
                """
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
