pipeline {
    agent any
    stages {
        stage('Build') { 
            steps {
                sh 'npm install' 
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
