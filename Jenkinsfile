pipeline {
    agent any
    
    parameters {
        string(name: 'awsRegion', defaultValue: 'us-east-1', description: 'AWS Region')
        string(name: 'accountId', defaultValue: '703862985210', description: 'AWS Account ID')
        string(name: 'ecrRepo', defaultValue: 'main-repository', description: 'ECR Repository Name')
    }
    
    environment {
        AWS_CREDENTIALS = credentials('aws-credentials')
    }

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("depi-api:latest", ".")
                }
            }
        }
        
        stage('Push to ECR') {
            steps {
                script {
                    sh """
                        aws ecr get-login-password --region ${params.awsRegion} | docker login --username AWS --password-stdin ${params.accountId}.dkr.ecr.${params.awsRegion}.amazonaws.com
                        docker tag depi-api:latest ${params.accountId}.dkr.ecr.${params.awsRegion}.amazonaws.com/${params.ecrRepo}:latest
                        docker push ${params.accountId}.dkr.ecr.${params.awsRegion}.amazonaws.com/${params.ecrRepo}:latest
                    """
                }
            }
        }
        
        stage('Notify Kubernetes') {
            steps {
                echo "Testing.."
                sh '''
                    echo "doing test stuff.."
                '''
            }
        }
    }
}
