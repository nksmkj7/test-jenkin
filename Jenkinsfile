pipeline {
    agent any
    parameters {
        // Git Parameter to select the branch from available branches
        gitParameter(
            name: 'BRANCH_NAME',            // Name of the parameter (this will be used to reference it)
            type: 'PT_BRANCH',              // Type for Git branches
            description: 'Select the Git branch to build', // Description shown in the UI
            branchFilter: 'origin/*',       // Filters branches to show (all remote branches)
            defaultValue: 'origin/main',    // Default branch selected (e.g., master)
            selectedValue: 'DEFAULT',       // Pre-select the default value automatically
            sortMode: 'DESCENDING_SMART',   // Sort the branches alphabetically
            useRepository: 'true'           // Use the repository defined in the SCM
        )
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    // Echo the selected branch for debugging
                    echo "Selected branch: ${params.BRANCH_NAME}"

                    // Checkout the selected branch using the Git parameter
                    // This step automatically checks out the branch defined in the Git parameter
                    checkout([
                        $class: 'GitSCM', 
                        branches: [[name: params.BRANCH_NAME]], 
                        userRemoteConfigs: [[url: 'https://github.com/nksmkj7/test-jenkin']] // Replace with your repo URL
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
