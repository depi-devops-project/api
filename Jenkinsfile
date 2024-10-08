pipeline {
    agent any

    parameters {
        string(name: 'awsRegion', defaultValue: 'us-east-1', description: 'AWS Region')
        string(name: 'accountId', defaultValue: '703862985210', description: 'AWS Account ID')
        string(name: 'ecrRepo', defaultValue: 'main-repository', description: 'ECR Repository Name')
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
                withCredentials([
                    usernamePassword(
                        credentialsId: 'aws-credentials', 
                        usernameVariable: 'AWS_ACCESS_KEY_ID', 
                        passwordVariable: 'AWS_SECRET_ACCESS_KEY'
                    )
                ]) {
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
                withCredentials([file(credentialsId: 'MACHINE_KEY', variable: 'secretFile')]) {
                    sh """
                        mkdir -p ~/.ssh
                        ssh-keyscan -H 3.83.24.195 >> ~/.ssh/known_hosts

                        ssh -i "${secretFile}" ubuntu@3.83.24.195 '
                            kubectl set image deployment/<your-deployment-name> <your-container-name>=<ecr-repo-url>:latest --record
                            kubectl rollout status deployment/<your-deployment-name>
                        '
                    """
                }
            }
        }

    }
}
