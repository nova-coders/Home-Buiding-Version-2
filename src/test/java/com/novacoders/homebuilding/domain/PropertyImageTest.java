package com.novacoders.homebuilding.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.novacoders.homebuilding.web.rest.TestUtil;

public class PropertyImageTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PropertyImage.class);
        PropertyImage propertyImage1 = new PropertyImage();
        propertyImage1.setId(1L);
        PropertyImage propertyImage2 = new PropertyImage();
        propertyImage2.setId(propertyImage1.getId());
        assertThat(propertyImage1).isEqualTo(propertyImage2);
        propertyImage2.setId(2L);
        assertThat(propertyImage1).isNotEqualTo(propertyImage2);
        propertyImage1.setId(null);
        assertThat(propertyImage1).isNotEqualTo(propertyImage2);
    }
}
