@Library('ceiba-jenkins-library') _
pipeline {
  //Donde se va a ejecutar el Pipeline
  agent {
    label 'Slave_Induccion'
  }

  //Opciones específicas de Pipeline dentro del Pipeline
  options {
    	buildDiscarder(logRotator(numToKeepStr: '3'))
 	disableConcurrentBuilds()
  }

  //Una sección que define las herramientas “preinstaladas” en Jenkins
  tools {
    jdk 'JDK11_Centos' //Verisión preinstalada en la Configuración del Master
  }

  //Aquí comienzan los “items” del Pipeline
  stages{
    stage('Checkout') {
      steps{
        echo "------------>Checkout<------------"
        checkout scm
      }
    }
  
    stage('NPM Install') {
      steps{
        echo "------------>Compile & Unit Tests<------------"
        sh 'cd Clinica/angular-base/;npm install'                        
      }
    }

    stage('Unit Test') {
      steps {
        echo "------------>Test<------------"
        sh 'cd Clinica/angular-base/;ng test --code-coverage --watch=false'
      }
    }

    stage('Static Code Analysis') {
      steps{
          sonarqubeMasQualityGatesP(sonarKey:'co.com.ceiba.adn.manuel.velasquez.clinica.front', 
          sonarName:'Ceiba-Clinica-Front(manuel.velasquez)', 
          sonarPathProperties:'./sonar-project.properties')
      }
    }


    stage('Test end-to-end') {
      steps {
        echo "------------>Test e2e<------------"
        //sh 'cd Clinica/angular-base/;ng e2e'        
      }
    }  
  }

  post {
    always {
      echo 'This will always run'
    }
    success {
      echo 'This will run only if successful'
    }
    failure {
      echo 'This will run only if failed'
      mail (to: 'manuel.velasquez@ceiba.com.co',subject: "Failed Pipeline:${currentBuild.fullDisplayName}",body: "Something is wrong with ${env.BUILD_URL}")
    }
    unstable {
      echo 'This will run only if the run was marked as unstable'
    }
    changed {
      echo 'This will run only if the state of the Pipeline has changed'
      echo 'For example, if the Pipeline was previously failing but is now successful'
    }
  }
}
