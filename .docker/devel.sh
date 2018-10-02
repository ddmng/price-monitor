#!/bin/ash

KEY="$1"
echo "devel.sh: received command $KEY"
RET="0"

case ${KEY} in
    test) # starts karma test server
      $(npm bin)/cypress open
      RET=$?
      echo "devel.sh return -> "$RET
    ;;
    --default)
      DEFAULT=YES
      echo "Wrong command specified"
    ;;
    *)    # unknown option
      echo "Unrecognized command"
    ;;
esac

exit $RET
