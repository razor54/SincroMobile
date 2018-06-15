package simulator.main;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import jdk.incubator.http.HttpClient;
import jdk.incubator.http.HttpRequest;
import jdk.incubator.http.HttpResponse;
import simulator.main.model.EventDto;
import simulator.main.model.EventListDto;

import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

public class Start {
    private JButton simularEventoButton;
    private JTextField vehiclePlate;
    private JPanel panel;
    private JLabel plateLabel;
    private JCheckBox verifiedCheckBox;
    private JTextField dateTextBox;
    private JTextField locationTextBox;
    private JTextField idTextField;
    private JButton simulate;
    private JTextField gpsLatitude;
    private JTextField gpsLongitude;

    private URI eventPostUri = URI.create("http://localhost:9000/event");
    private int counterId = 270;

    public Start() {



        simularEventoButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                try {
                    Map<String, String> map = new HashMap<>();
                    map.put("id", idTextField.getText());
                    map.put("date", dateTextBox.getText());
                    map.put("verified", String.valueOf(verifiedCheckBox.isSelected()));
                    map.put("location", locationTextBox.getText());
                    map.put("plate", vehiclePlate.getText());
                    map.put("gpsLatitude", gpsLatitude.getText());
                    map.put("gpsLongitude", gpsLongitude.getText());

                    postJSON(eventPostUri, map);

                } catch (Exception ex) {
                    JOptionPane.showMessageDialog(null, "There was an error, try again", "InfoBox: Error", JOptionPane.INFORMATION_MESSAGE);
                }

            }
        });
        locationTextBox.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                System.out.println("Text=" + locationTextBox.getText());
            }
        });
        dateTextBox.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {

            }
        });
        verifiedCheckBox.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {

            }
        });
        vehiclePlate.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {

            }
        });
        simulate.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent ev) {

                InputStream inJson = EventListDto.class.getResourceAsStream("/events.json");
                EventListDto sample = null;
                try {
                    sample = new ObjectMapper().readValue(inJson, EventListDto.class);
                } catch (IOException e) {
                    e.printStackTrace();
                }

                if (sample != null) {
                    sample.getEvents().forEach(Start.this::handleSimulateObj);
                }
            }
        });
    }


    private void handleSimulateObj(EventDto eventListDto){
        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
        String json = null;
        try {
            eventListDto.setId(++counterId);
            json = ow.writeValueAsString(eventListDto);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        postRequest(eventPostUri,json);
    }


    public CompletableFuture<Void> postJSON(URI uri,
                                            Map<String, String> map)
            throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        String requestBody = objectMapper
                .writerWithDefaultPrettyPrinter()
                .writeValueAsString(map);

        return postRequest(uri, requestBody);

    }

    private CompletableFuture<Void> postRequest(URI uri, String requestBody) {
        HttpRequest request = HttpRequest.newBuilder(uri)
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyProcessor.fromString(requestBody))
                .build();

        return HttpClient.newHttpClient()
                .sendAsync(request, HttpResponse.BodyHandler.asString())
                .thenApply(HttpResponse::statusCode)
                .thenAccept(System.out::println);
    }

    public static void main(String... args) {
        JFrame frame = new JFrame("Simulator");
        frame.setContentPane(new Start().panel);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.pack();
        frame.setVisible(true);

    }

    private void createUIComponents() {
        // TODO: place custom component creation code here
    }
}
