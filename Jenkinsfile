pipeline {
    agent any

    parameters {
        string(name: 'BRANCH_NAME', defaultValue: 'main', description: 'Choose the branch to build')
    }

    stages {
        stage('Prepare Branch List') {
            steps {
                script {
                     // Get a list of remote branches from Git
                    def branches = sh(script: "git branch -r | grep -v '\\->' | sed 's/origin\\///'", returnStdout: true).trim().split("\n")
                    
                    // Update global parameters dynamically with available branches
                    def branchChoices = branches.collect { it.trim() }

                    // Use the properties block to update parameters with dynamic branch list
                    properties([
                        parameters([
                            choice(name: 'BRANCH_NAME', choices: branchChoices, description: 'Select a branch')
                        ])
                    ])

                    echo "Available branches: ${branchChoices}"

                    // Checkout the code from the repository
                    // checkout scm
                }
            }
        }

        stage('Checkout') {
            steps {
                script {
                    // Checkout the selected branch
                    echo "Checking out branch: ${params.BRANCH_NAME}"
                    checkout scm
                    sh "git checkout ${params.BRANCH_NAME}"
                }
            }
        }

        stage('Echo Branch') {
            steps {
                echo "The selected branch is: ${params.BRANCH_NAME}"
            }
        }
    }
}
