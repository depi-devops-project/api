pipeline {
    agent any 

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build(":depi-api:latest", ".")
                }
            }
        }

        stage('Push to ECR') {
            steps {
                script {
                    sh """
                        aws ecr get-login-password --region ${params.awsRegion} | docker login --username AWS --password-stdin ${params.accountId}.dkr.ecr.${params.awsRegion}.amazonaws.com
                    """

                    sh "docker tag depi-api:latest ${params.accountId}.dkr.ecr.${params.awsRegion}.amazonaws.com/${params.ecrRepo}:latest"

                    sh "docker push ${params.accountId}.dkr.ecr.${params.awsRegion}.amazonaws.com/${params.ecrRepo}:latest"
                }
            }
        }

        stage('Notify Kuberenetes'){
            steps{
            }
        }
    }
}
