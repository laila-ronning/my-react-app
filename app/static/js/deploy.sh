#!/bin/bash
APP=$1
MILJO=$2
VERSJON=${3:-1.0-SNAPSHOT}

if [ -z "$APP" -o -z "$MILJO" ]; then 
    echo "Bruk: ./deploy <app> <miljo> (<version>)"
    echo "Eks:  ./deploy saksbehandling at"
    exit 1
fi

if [ -z "$SIKKERSONE" ]; then
    NEXUS_URL=http://aurora/nexus/content/repositories/snapshots
    PYTHON_SOFTWARE_REPO=http://aurora/svn/skd_au/software/python
else
    NEXUS_URL=http://xstu114au.skead.no:8081/nexus/content/repositories/aurorasnapshots
    PYTHON_SOFTWARE_REPO=http://xstu113au.skead.no/skd_au2/software/python
fi

bash <(curl -ns $PYTHON_SOFTWARE_REPO/node-manager.sh) deploy $APP-$MILJO $VERSJON ske.fastsetting.skatt $APP-spec config/$APP-deployment.yaml $NEXUS_URL


