#!/usr/bin/env bash

KEY="$1"
RET="0"
case ${KEY} in
    ci) # Runs ci tests
        echo "Running CI tests"
        $(npm bin)/cypress run --spec 'cypress/integration/ci/**/*'
        RET="${?}"
    ;;
    healthcheck) # Runs healthcheck
        echo "Running healthcheck"
        $(npm bin)/cypress run --spec 'cypress/integration/healthcheck/**/*'
        RET="${?}"
    ;;
    *)    # unknown option
        echo "Unrecognized command"
        RET=128
    ;;
esac

echo "Exit code: "$RET
exit $RET
