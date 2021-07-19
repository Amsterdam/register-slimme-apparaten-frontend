#!groovy

def tryStep(String message, Closure block, Closure tearDown = null) {
    try {
        block()
    }
    catch (Throwable t) {
        slackSend message: "${env.JOB_NAME}: ${message} failure ${env.BUILD_URL}", channel: '#ci-channel', color: 'danger'

        throw t
    }
    finally {
        if (tearDown) {
            tearDown()
        }
    }
}

node {
    stage("Checkout") {
        checkout scm
    }

    stage("Unit tests") {
      String  PROJECT = "iot-unittests-${env.BUILD_NUMBER}"

      tryStep "unittests start", {
        sh "docker-compose -p ${PROJECT} up --build --exit-code-from test-unit test-unit"
      }
      always {
        tryStep "unittests stop", {
          sh "docker-compose -p ${PROJECT} down -v || true"
        }
      }
    }
}

node {
    stage("Build acceptance image") {
        tryStep "build", {
            def image = docker.build("docker-registry.secure.amsterdam.nl/ois/slimme-apparaten-frontend:${env.BUILD_NUMBER}",
                "--shm-size 1G " +
                "--build-arg BUILD_ENV=acc " +
                "--build-arg BUILD_NUMBER=${env.BUILD_NUMBER} " +
                ". ")
            image.push()
        }
    }
}


String BRANCH = "${env.BRANCH_NAME}"

if (BRANCH == "master" || BRANCH == "develop" ) {

    node {
        stage('Push acceptance image') {
            tryStep "image tagging", {
                def image = docker.image("docker-registry.secure.amsterdam.nl/ois/slimme-apparaten-frontend:${env.BUILD_NUMBER}")
                image.pull()
                image.push("acceptance")
            }
        }
    }

    node {
        stage("Deploy to ACC") {
            tryStep "deployment", {
                build job: 'Subtask_Openstack_Playbook',
                parameters: [
                    [$class: 'StringParameterValue', name: 'INVENTORY', value: 'acceptance'],
                    [$class: 'StringParameterValue', name: 'PLAYBOOK', value: 'deploy.yml'],
                    [$class: 'StringParameterValue', name: 'PLAYBOOKPARAMS', value: "-e cmdb_id=app_slimme-apparaten-frontend"]                  ]
            }
        }
    }

}

if (BRANCH == "master") {

    stage('Waiting for approval') {
        slackSend channel: '#ci-channel', color: 'warning', message: 'Slimme Apparaten frontend is waiting for Production Release - please confirm'
        timeout(10) {
          input "Deploy to Production?"
        }
    }

    node {
        stage("Build and Push Production image") {
            tryStep "build", {
                def image = docker.build("docker-registry.secure.amsterdam.nl/ois/slimme-apparaten-frontend:${env.BUILD_NUMBER}",
                    "--shm-size 1G " +
                    "--build-arg BUILD_NUMBER=${env.BUILD_NUMBER} " +
                    ".")
                image.push("production")
                image.push("latest")
            }
        }
    }


    node {
        stage("Deploy") {
            tryStep "deployment", {
                build job: 'Subtask_Openstack_Playbook',
                parameters: [
                    [$class: 'StringParameterValue', name: 'INVENTORY', value: 'production'],
                    [$class: 'StringParameterValue', name: 'PLAYBOOK', value: 'deploy.yml'],
                    [$class: 'StringParameterValue', name: 'PLAYBOOKPARAMS', value: "-e cmdb_id=app_slimme-apparaten-frontend"]                  ]
            }
        }
    }
}
