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

String BUILD_ID = "${Math.abs(new Random().nextInt() % 600) + 1}"

node {
    stage("Checkout") {
        checkout scm
    }
}

node {

    // stage('Test') {
    //     tryStep "test", {
    //         sh "docker-compose up --abort-on-container-exit test-unit"
    //     }
    // }

    stage("Build and push acceptance image") {

        tryStep "build image", {
            def image = docker.build("docker-registry.secure.amsterdam.nl/ois/slimme-apparaten-frontend:${BUILD_ID}",
            "--shm-size 1G " +
            "--build-arg BUILD_NUMBER=${BUILD_ID} " +
            ". ")

            image.push("acceptance")
        }
    }
}


String BRANCH = "${env.BRANCH_NAME}"


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

if (BRANCH == "master") {

    stage('Waiting for approval') {
        slackSend channel: '#ci-channel', color: 'warning', message: 'Slimme Apparaten frontend is waiting for Production Release - please confirm'
        timeout(10) {
          input "Deploy to Production?"
        }
    }

    node {
        stage("Push Production image") {
            tryStep "build", {
                def image = docker.image("docker-registry.secure.amsterdam.nl/ois/slimme-apparaten-frontend:${BUILD_ID}")
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
