pipeline {
    agent any
    parameters {
        // Git Parameter to select the branch from available branches
        gitParameter(
            name: 'BRANCH_NAME',            // Name of the parameter (this will be used to reference it)
            type: 'PT_BRANCH',              // Type for Git branches
            description: 'Select the Git branch to build', // Description shown in the UI
            branchFilter: 'origin/*',       // Filters branches to show (all remote branches)
            defaultValue: 'origin/main',  // Default branch selected (e.g., master)
            selectedValue: 'NONE',       // Pre-select the default value automatically
            sortMode: 'DESCENDING_SMART'          // Sort the branches alphabetically
        )
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    // Echo the selected branch for debugging
                    echo "Selected branch: ${params.BRANCH_NAME}"
                    
                    // Checkout the selected branch
                    checkout([
                        $class: 'GitSCM',
                        branches: [[name: "${params.BRANCH_NAME}"]],
                        userRemoteConfigs: [[
                            url: 'https://github.com/nksmkj7/test-jenkin',
                            credentialsId: 'companion-jenkins-ci'  // Optional: if repo is private
                        ]]
                        extensions: [[$class: 'GitSCMSourceDefaults']]
                    ])
                   
                }
            }
        }

        stage('Build') {
            steps {
                echo "Building the selected branch: ${params.BRANCH_NAME}"
            }
        }
    }
}
