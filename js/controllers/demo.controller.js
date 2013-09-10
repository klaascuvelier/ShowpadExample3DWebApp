'use strict';

angular
    .module('ShowpadDemo')
    .controller('DemoController', [
        '$scope', '$three',
        function ($scope, $three) {

            // list of available colors
            $scope.backgroundColors = ['#c0ebcf', '#7ebccc', '#d3e495', '#ecf0f1'];
            $scope.cupboardColors = ['#9b59b6', '#3498db', '#00ba00', '#48c9b0', '#f1c40f', '#e67e22', '#e74c3c', '#ecf0f1'];

            // select default colors
            $scope.backgroundColor = $scope.backgroundColors[0];
            $scope.cupboardColor = $scope.cupboardColors[0];

            // set default rows and size
            $scope.verticalRows = 5;
            $scope.horizontalRows = 5;
            $scope.squareSize = 40;

            //
            $scope.canvasWrapper = document.getElementById('canvas-wrapper');


            /**
             * @param {String} color
             */
            $scope.setBackgroundColor = function (color) {
                $scope.backgroundColor = color;
            }

            /**
             * @param {String} color
             */
            $scope.setCupboardColor = function (color) {
                $scope.cupboardColor = color;
            }

            // watch for changes in configuration, render $three if needed
            $scope.$watch('[cupboardColor, verticalRows, horizontalRows, squareSize]', function() {
                $three.generate(
                    parseInt($scope.horizontalRows, 10),
                    parseInt($scope.verticalRows, 10),
                    parseInt($scope.squareSize, 10),
                    $scope.cupboardColor, 10
                );
                $three.render();
            }, true);

            // watch background color to change DOM element style
            $scope.$watch('backgroundColor', function (backgroundColor) {
                $scope.canvasWrapper.style.backgroundColor = backgroundColor;
            })

            // initialise $three with the canvas wrapper element
            $three.init($scope.canvasWrapper);
        }
    ]);