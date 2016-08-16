package com.productsapi.commons.domain;

import javax.persistence.*;

@MappedSuperclass
public abstract class IdentifiableEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

}
