package iplant.test;
import java.io.File;
import java.io.IOException;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.entity.mime.content.FileBody;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;

public class Test {
    private static final String IMAGE1 = "/Users/katherinegil/IdeaProjects/iPlant/src/main/resources/static/assets/image_1.jpeg";
    private static final String IMAGE2 = "/Users/katherinegil/IdeaProjects/iPlant/src/main/resources/static/assets/image_2.jpeg";
    private static final String URL = "https://my-api.plantnet.org/v2/identify/all?api-key=2b10rgtX87p73sKTXCtNNzUNPe";

    public static void main(String[] args) {
        File file1 = new File(IMAGE1);
        File file2 = new File(IMAGE2);

        HttpEntity entity = MultipartEntityBuilder.create()
                .addPart("images", new FileBody(file1)).addTextBody("organs", "flower")
                .addPart("images", new FileBody(file2)).addTextBody("organs", "leaf")
                .build();

        HttpPost request = new HttpPost(URL);
        request.setEntity(entity);

        HttpClient client = HttpClientBuilder.create().build();
        HttpResponse response;
        try {
            response = client.execute(request);
            String jsonString = EntityUtils.toString(response.getEntity());
            System.out.println(jsonString);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
