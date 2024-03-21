
echo "Building latext file"

while getopts p: flag
do
    case "${flag}" in 
    p) 
        FILEPATH=${OPTARG};;
    esac
done


echo "File to build $FILEPATH"



pdflatex $FILEPATH && xdg-open $FILEPATH.pdf

echo ::set-output name=is-success::True

exit 0