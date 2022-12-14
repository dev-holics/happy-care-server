pipeline {
    agent any
    stages {
        stage('Build') { 
            steps {
                sh 'yarn install' 
                sh 'yarn lint:src' 
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
