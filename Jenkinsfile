pipeline {
    agent any
    
    parameters {
        string(name: 'awsRegion', defaultValue: 'us-east-1', description: 'AWS Region')
        string(name: 'accountId', defaultValue: '703862985210', description: 'AWS Account ID')
        string(name: 'ecrRepo', defaultValue: 'main-repository', description: 'ECR Repository Name')
    }
    
    environment {
        AWS_CREDENTIALS = credentials('aws-credentials')
        AWS_ACCESS_KEY_ID = credentials('aws-access-key-id')
        AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')
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
                withCredentials([[
                    credentialsId: 'aws-credentials',
                    accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                    secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                ]]) {
                    sh """
                        aws configure set aws_access_key_id ${AWS_ACCESS_KEY_ID}
                        aws configure set aws_secret_access_key ${AWS_SECRET_ACCESS_KEY}
                        aws configure set region ${params.awsRegion}
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
