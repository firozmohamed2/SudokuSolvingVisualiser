import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Timer;
import java.util.TimerTask;


public class Main implements ActionListener {

    static int count=0;


    JFrame jFrame;
    //JPanel panel;
    Board panel;
    static JLabel[][] labels;
    private static final int GRID_SIZE = 9;
    private static final int BOX_SIZE = 3;
    static Color greenCustom = new Color(50, 168, 125); // Color green


    public Main(){
         jFrame= new JFrame();//Jframe is basically a window
        jFrame.setResizable(false);

         panel= new Board();// to put objects inside window , we use the panel
        labels= new JLabel[9][9];





     int grid[][]= { {3, 0, 6, 5, 0, 8, 4, 0, 0},
            {5, 2, 0, 0, 0, 0, 0, 0, 0},
            {0, 8, 7, 0, 0, 0, 0, 3, 1},
            {0, 0, 3, 0, 1, 0, 0, 8, 0},
            {9, 0, 0, 8, 6, 3, 0, 0, 5},
            {0, 5, 0, 0, 9, 0, 6, 0, 0},
            {1, 3, 0, 0, 0, 0, 2, 5, 0},
            {0, 0, 0, 0, 0, 0, 0, 7, 4},
            {0, 0, 5, 2, 0, 6, 3, 0, 0} };



        for(int i = 0; i < 9; i++) {
            for(int j=0;j<9;j++) {
                labels[i][j] = new JLabel();
                labels[i][j].setPreferredSize(new Dimension(50, 50));

                if(grid[i][j]==0){
                    labels[i][j].setText("");
                }
                else {
                    labels[i][j].setText(String.valueOf(grid[i][j]));
                }

                panel.add(labels[i][j]);
            }
        }





        panel.setBorder(BorderFactory.createEmptyBorder(35,45,10,30));// set border requires a border object . So borderfactory used
        panel.setLayout(new GridLayout(9,9));
        jFrame.add(panel,BorderLayout.CENTER);
        jFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        jFrame.setTitle("Sudoku Solver");
        jFrame.pack();
        jFrame.setVisible(true);

        solveSudoku(grid);

    }

    private void solveSudoku(int[][] board) {
        System.out.println("\nInput ..\n");
        printBoard(board);


        if (solveBoard(board)) {
            System.out.println("\nSolved !!\n");
            printBoard(board);
        } else {
            System.out.println("\nUnsolvable !!");
        }


       



            }


    private static void printBoard(int[][] board) {

        for (int row = 0; row < GRID_SIZE; row++) {
            if (row % 3 == 0 && row != 0) {
                System.out.println("------------");
            }
            for (int column = 0; column < GRID_SIZE; column++) {
                if (column % 3 == 0 && column != 0) {
                    System.out.print("|");
                }
                System.out.print(board[row][column]);
            }
            System.out.println();
        }












    }

    private static boolean isNumberInRow(int[][] board, int number, int row) {
        for (int i = 0; i < GRID_SIZE; i++) {
            if (board[row][i] == number) {
                return true;
            }
        }
        return false;
    }

    private static boolean isNumberInColumn(int[][] board, int number, int column) {
        for (int i = 0; i < GRID_SIZE; i++) {
            if (board[i][column] == number) {
                return true;
            }
        }
        return false;
    }

    private static boolean isNumberInBox(int[][] board, int number, int row, int column) {
        int initialBoxRow = row - row % BOX_SIZE;
        int initialBoxColumn = column - column % BOX_SIZE;

        for (int i = initialBoxRow; i < initialBoxRow + BOX_SIZE; i++) {
            for (int j = initialBoxColumn; j < initialBoxColumn + BOX_SIZE; j++) {
                if (board[i][j] == number) {
                    return true;
                }
            }
        }
        return false;
    }

    private static boolean isValidPlacement(int[][] board, int number, int row, int column) {
        return !isNumberInRow(board, number, row) && !isNumberInColumn(board, number, column)
                && !isNumberInBox(board, number, row, column);
    }

    private static boolean solveBoard(int[][] board) {
        try {
            Thread.sleep(1000);

        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

        for (int row = 0; row < GRID_SIZE; row++) {
            for (int column = 0; column < GRID_SIZE; column++) {
                if (board[row][column] == 0) {
                    for (int numberToTry = 1; numberToTry <= GRID_SIZE; numberToTry++) {
                        if (isValidPlacement(board, numberToTry, row, column)) {
                            board[row][column] = numberToTry;
                            labels[row][column].setText(String.valueOf(numberToTry));
                            labels[row][column].setForeground(greenCustom);
                            if (solveBoard(board)) {
                                return true;
                            } else {
                                board[row][column] = 0;
                                labels[row][column].setText(" ");
                                labels[row][column].setForeground(greenCustom);
                            }
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }




    public static void main(String[] args) {
       new Main();
    }

    @Override
    public void actionPerformed(ActionEvent e) {
           count++;

    }
}