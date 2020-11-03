package com.novacoders.homebuilding.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.novacoders.homebuilding.web.rest.TestUtil;

public class PropertyCategoryTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PropertyCategory.class);
        PropertyCategory propertyCategory1 = new PropertyCategory();
        propertyCategory1.setId(1L);
        PropertyCategory propertyCategory2 = new PropertyCategory();
        propertyCategory2.setId(propertyCategory1.getId());
        assertThat(propertyCategory1).isEqualTo(propertyCategory2);
        propertyCategory2.setId(2L);
        assertThat(propertyCategory1).isNotEqualTo(propertyCategory2);
        propertyCategory1.setId(null);
        assertThat(propertyCategory1).isNotEqualTo(propertyCategory2);
    }
}
