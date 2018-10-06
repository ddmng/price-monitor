#!/usr/bin/env bash

KEY="$1"
RET="0"
case ${KEY} in
    ci) # Runs ci tests
        $(npm bin)/cypress run --spec 'cypress/integration/ci/**/*'
    ;;
    healthcheck) # Runs healthcheck
        $(npm bin)/cypress run --spec 'cypress/integration/healthcheck/**/*'
    ;;

    *)    # unknown option
        echo "Unrecognized command"
    ;;
esac

echo "Exit code: "$RET
exit $RET
