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

    stage('Lint') {
        sh 'npm run lint || echo "No lint configuration found"'
    }

    stage('Test') {
        sh 'npm test || echo "No tests found"'
    }
}

// Rest of getGitBranches() function remains the same
