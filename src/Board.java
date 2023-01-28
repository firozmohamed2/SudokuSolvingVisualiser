import javax.swing.*;
import java.awt.*;

public class Board extends JPanel {
    final int cols = 9;
    final int rows = 9;
    final int originX= 23;
    final int originY= 37;
    final int cellSide = 50;
    private Color[] colors = { Color.RED, Color.BLUE, Color.GREEN, Color.YELLOW, Color.BLACK,Color.lightGray };


    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);
        for(int i=0;i<rows+1;i++){
            if(i%3==0){
                g.setColor(colors[4]);
            }
            else{
                g.setColor(colors[5]);

            }

                g.drawLine(originX, originY + i * cellSide, originX + cols * cellSide, originY + i * cellSide);
            }

        for(int i=0;i<cols+1;i++){
            if(i%3==0){
                g.setColor(colors[4]);
            }
            else{
                g.setColor(colors[5]);

            }


            g.drawLine(originX+i*cellSide, originY, originX + i * cellSide, originY + rows * cellSide);
        }
    }
}
