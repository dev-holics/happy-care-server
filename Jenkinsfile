pipeline {
    agent any
    tools {
    nodejs '19.3.0'
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install yarn'
                sh 'npm run build'
                sh 'npm run lint'
            }
        }
        stage('Test') {
            steps {
                sh 'echo "Test"'
            }
        }
        stage("Deploy Stage") {
            steps {
                sh 'echo "hello"'
            }
        }
    }
}
