// Run once in mongosh against a fresh exercise database.
// These records are fictional events for the case study.
(async function () {
  db = db.getSiblingDB('portfolio_nosql');
  if ((await db.getCollectionNames()).includes("loan_events")) {
    throw new Error('The exercise collection already exists. Use a fresh database.');
  }

  // The validator checks the stable event fields while details can vary.
  await db.createCollection("loan_events", {
    validator: {
    "$jsonSchema": {
        "bsonType": "object",
        "required": [
            "_id",
            "schemaVersion",
            "simulation",
            "eventType",
            "occurredAt",
            "source",
            "embedded",
            "references",
            "details"
        ],
        "properties": {
            "_id": {
                "bsonType": "string",
                "minLength": 1
            },
            "schemaVersion": {
                "enum": [
                    1
                ]
            },
            "simulation": {
                "enum": [
                    true
                ]
            },
            "eventType": {
                "bsonType": "string",
                "enum": [
                    "loan_opened",
                    "loan_returned"
                ]
            },
            "occurredAt": {
                "bsonType": "date"
            },
            "source": {
                "bsonType": "object",
                "required": [
                    "entity",
                    "key",
                    "snapshot"
                ],
                "properties": {
                    "entity": {
                        "enum": [
                            "loan"
                        ]
                    },
                    "key": {
                        "bsonType": "object",
                        "required": [
                            "loan_id"
                        ]
                    },
                    "snapshot": {
                        "bsonType": "object"
                    }
                }
            },
            "embedded": {
                "bsonType": "object"
            },
            "references": {
                "bsonType": "object"
            },
            "details": {
                "bsonType": "object"
            }
        }
    }
},
    validationLevel: 'strict', validationAction: 'error'
  });

  // Insert the four example events and show their IDs.
  printjson(await db.getCollection("loan_events").insertMany([
    {
        "_id": "event_000001",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "loan_opened",
        "occurredAt": ISODate("2030-01-01T10:00:00Z"),
        "source": {
            "entity": "loan",
            "key": {
                "loan_id": 301
            },
            "snapshot": {
                "loan_id": 301,
                "member_id": 101,
                "book_id": 201,
                "loan_date": "2026-02-01",
                "due_date": "2026-02-15",
                "returned_on": null
            }
        },
        "embedded": {
            "member": [
                {
                    "key": {
                        "member_id": 101
                    },
                    "snapshot": {
                        "member_id": 101,
                        "full_name": "Avery Chen",
                        "email": "avery.chen@example.test",
                        "joined_on": "2024-01-15",
                        "active": true
                    },
                    "via": [
                        "loan.member_id → member"
                    ]
                }
            ],
            "book": [
                {
                    "key": {
                        "book_id": 201
                    },
                    "snapshot": {
                        "book_id": 201,
                        "isbn": "9780000000201",
                        "title": "The Quiet Archive",
                        "author": "Morgan Lee",
                        "published_on": "2020-06-10"
                    },
                    "via": [
                        "loan.book_id → book"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "web"
        }
    },
    {
        "_id": "event_000002",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "loan_returned",
        "occurredAt": ISODate("2030-01-01T10:01:00Z"),
        "source": {
            "entity": "loan",
            "key": {
                "loan_id": 301
            },
            "snapshot": {
                "loan_id": 301,
                "member_id": 101,
                "book_id": 201,
                "loan_date": "2026-02-01",
                "due_date": "2026-02-15",
                "returned_on": null
            }
        },
        "embedded": {
            "member": [
                {
                    "key": {
                        "member_id": 101
                    },
                    "snapshot": {
                        "member_id": 101,
                        "full_name": "Avery Chen",
                        "email": "avery.chen@example.test",
                        "joined_on": "2024-01-15",
                        "active": true
                    },
                    "via": [
                        "loan.member_id → member"
                    ]
                }
            ],
            "book": [
                {
                    "key": {
                        "book_id": 201
                    },
                    "snapshot": {
                        "book_id": 201,
                        "isbn": "9780000000201",
                        "title": "The Quiet Archive",
                        "author": "Morgan Lee",
                        "published_on": "2020-06-10"
                    },
                    "via": [
                        "loan.book_id → book"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "mobile",
            "note": "Illustrative event-specific metadata",
            "attributes": [
                {
                    "entity": "loan",
                    "key": {
                        "loan_id": 301
                    },
                    "field": "due_date",
                    "value": "2026-02-15"
                },
                {
                    "entity": "loan",
                    "key": {
                        "loan_id": 301
                    },
                    "field": "returned_on",
                    "value": null
                }
            ],
            "examples": {
                "actor_note": "illustrative actor_note"
            }
        }
    },
    {
        "_id": "event_000003",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "loan_opened",
        "occurredAt": ISODate("2030-01-01T10:02:00Z"),
        "source": {
            "entity": "loan",
            "key": {
                "loan_id": 302
            },
            "snapshot": {
                "loan_id": 302,
                "member_id": 102,
                "book_id": 202,
                "loan_date": "2026-02-03",
                "due_date": "2026-02-17",
                "returned_on": "2026-02-12"
            }
        },
        "embedded": {
            "member": [
                {
                    "key": {
                        "member_id": 102
                    },
                    "snapshot": {
                        "member_id": 102,
                        "full_name": "Jordan Patel",
                        "email": "jordan.patel@example.test",
                        "joined_on": "2024-03-02",
                        "active": true
                    },
                    "via": [
                        "loan.member_id → member"
                    ]
                }
            ],
            "book": [
                {
                    "key": {
                        "book_id": 202
                    },
                    "snapshot": {
                        "book_id": 202,
                        "isbn": "9780000000202",
                        "title": "Maps of Winter",
                        "author": "Riley Hart",
                        "published_on": "2021-09-18"
                    },
                    "via": [
                        "loan.book_id → book"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "web"
        }
    },
    {
        "_id": "event_000004",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "loan_returned",
        "occurredAt": ISODate("2030-01-01T10:03:00Z"),
        "source": {
            "entity": "loan",
            "key": {
                "loan_id": 302
            },
            "snapshot": {
                "loan_id": 302,
                "member_id": 102,
                "book_id": 202,
                "loan_date": "2026-02-03",
                "due_date": "2026-02-17",
                "returned_on": "2026-02-12"
            }
        },
        "embedded": {
            "member": [
                {
                    "key": {
                        "member_id": 102
                    },
                    "snapshot": {
                        "member_id": 102,
                        "full_name": "Jordan Patel",
                        "email": "jordan.patel@example.test",
                        "joined_on": "2024-03-02",
                        "active": true
                    },
                    "via": [
                        "loan.member_id → member"
                    ]
                }
            ],
            "book": [
                {
                    "key": {
                        "book_id": 202
                    },
                    "snapshot": {
                        "book_id": 202,
                        "isbn": "9780000000202",
                        "title": "Maps of Winter",
                        "author": "Riley Hart",
                        "published_on": "2021-09-18"
                    },
                    "via": [
                        "loan.book_id → book"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "mobile",
            "note": "Illustrative event-specific metadata",
            "attributes": [
                {
                    "entity": "loan",
                    "key": {
                        "loan_id": 302
                    },
                    "field": "due_date",
                    "value": "2026-02-17"
                },
                {
                    "entity": "loan",
                    "key": {
                        "loan_id": 302
                    },
                    "field": "returned_on",
                    "value": "2026-02-12"
                }
            ],
            "examples": {
                "actor_note": "illustrative actor_note"
            }
        }
    }
]));
  await db.getCollection("loan_events").createIndex({eventType: 1, occurredAt: -1}, {name: 'event_type_time'});

  // 1. Find the first sample event type (up to five documents).
  printjson(await db.getCollection("loan_events").find({"eventType":"loan_opened"}).sort({_id:1}).limit(5).toArray());

  // 2. Find events for the first source record using nested key fields (up to five).
  printjson(await db.getCollection("loan_events").find({"source.key.loan_id":301}).sort({_id:1}).limit(5).toArray());

  // 3. Find events in the sample time range using a MongoDB Date filter (up to five).
  printjson(await db.getCollection("loan_events").find({"occurredAt":{"$gte":ISODate("2030-01-01T10:00:00Z"), "$lt":ISODate("2030-01-01T11:00:00Z")}}).sort({_id:1}).limit(5).toArray());

  // 4. Count documents for each event type.
  printjson(await db.getCollection("loan_events").aggregate([{"$group":{"_id":"$eventType", "documentCount":{"$sum":1}}}, {"$sort":{"_id":1}}]).toArray());

  // A date stored as text should be rejected by the validator.
  try {
    await db.getCollection("loan_events").insertOne({...{
    "_id": "event_000001",
    "schemaVersion": 1,
    "simulation": true,
    "eventType": "loan_opened",
    "occurredAt": ISODate("2030-01-01T10:00:00Z"),
    "source": {
        "entity": "loan",
        "key": {
            "loan_id": 301
        },
        "snapshot": {
            "loan_id": 301,
            "member_id": 101,
            "book_id": 201,
            "loan_date": "2026-02-01",
            "due_date": "2026-02-15",
            "returned_on": null
        }
    },
    "embedded": {
        "member": [
            {
                "key": {
                    "member_id": 101
                },
                "snapshot": {
                    "member_id": 101,
                    "full_name": "Avery Chen",
                    "email": "avery.chen@example.test",
                    "joined_on": "2024-01-15",
                    "active": true
                },
                "via": [
                    "loan.member_id → member"
                ]
            }
        ],
        "book": [
            {
                "key": {
                    "book_id": 201
                },
                "snapshot": {
                    "book_id": 201,
                    "isbn": "9780000000201",
                    "title": "The Quiet Archive",
                    "author": "Morgan Lee",
                    "published_on": "2020-06-10"
                },
                "via": [
                    "loan.book_id → book"
                ]
            }
        ]
    },
    "references": {},
    "details": {
        "channel": "web"
    }
}, _id: 'invalid_date_example', occurredAt: 'not-a-date'});
  } catch (error) { print('Invalid date error: ' + error.code); }

  // Reusing an event ID should be rejected by the unique _id index.
  try { await db.getCollection("loan_events").insertOne({
    "_id": "event_000001",
    "schemaVersion": 1,
    "simulation": true,
    "eventType": "loan_opened",
    "occurredAt": ISODate("2030-01-01T10:00:00Z"),
    "source": {
        "entity": "loan",
        "key": {
            "loan_id": 301
        },
        "snapshot": {
            "loan_id": 301,
            "member_id": 101,
            "book_id": 201,
            "loan_date": "2026-02-01",
            "due_date": "2026-02-15",
            "returned_on": null
        }
    },
    "embedded": {
        "member": [
            {
                "key": {
                    "member_id": 101
                },
                "snapshot": {
                    "member_id": 101,
                    "full_name": "Avery Chen",
                    "email": "avery.chen@example.test",
                    "joined_on": "2024-01-15",
                    "active": true
                },
                "via": [
                    "loan.member_id → member"
                ]
            }
        ],
        "book": [
            {
                "key": {
                    "book_id": 201
                },
                "snapshot": {
                    "book_id": 201,
                    "isbn": "9780000000201",
                    "title": "The Quiet Archive",
                    "author": "Morgan Lee",
                    "published_on": "2020-06-10"
                },
                "via": [
                    "loan.book_id → book"
                ]
            }
        ]
    },
    "references": {},
    "details": {
        "channel": "web"
    }
}); }
  catch (error) { print('Duplicate ID error: ' + error.code); }

  print('Document count: ' + await db.getCollection("loan_events").countDocuments());
})().catch(error => { print(error.stack || String(error)); quit(1); });
