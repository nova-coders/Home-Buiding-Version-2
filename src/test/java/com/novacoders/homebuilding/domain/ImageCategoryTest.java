package com.novacoders.homebuilding.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.novacoders.homebuilding.web.rest.TestUtil;

public class ImageCategoryTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ImageCategory.class);
        ImageCategory imageCategory1 = new ImageCategory();
        imageCategory1.setId(1L);
        ImageCategory imageCategory2 = new ImageCategory();
        imageCategory2.setId(imageCategory1.getId());
        assertThat(imageCategory1).isEqualTo(imageCategory2);
        imageCategory2.setId(2L);
        assertThat(imageCategory1).isNotEqualTo(imageCategory2);
        imageCategory1.setId(null);
        assertThat(imageCategory1).isNotEqualTo(imageCategory2);
    }
}
