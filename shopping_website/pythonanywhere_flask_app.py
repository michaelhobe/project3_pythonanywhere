from flask import Flask, jsonify, request
from flask_cors import CORS
import MySQLdb
import bcrypt



app = Flask(__name__)
app.secret_key = 'your_secret_key_here'  # Replace with a strong secret key
CORS(app)  # Enable CORS for all routes

# Database configuration
DB_CONFIG = {
    'host': 'michaelhobart.mysql.pythonanywhere-services.com',
    'user': 'michaelhobart',
    'passwd': '12345678mick',
    'db': 'michaelhobart$project3'
}

def get_db_connection():
    """Create and return a database connection"""
    return MySQLdb.connect(**DB_CONFIG)

@app.route('/')
def home():
    return jsonify({
        'status': 'success',
        'message': 'Shopping Website API is running',
        'endpoints': ['/api/products', '/api/orders', '/checkout']
    })

@app.route('/api/products')
def get_products():
    """Get all products"""
    try:
        db = get_db_connection()
        cursor = db.cursor()

        # Match actual database structure: cost_price, sell_price, image_url
        cursor.execute("""
            SELECT id, name, cost_price, sell_price, category, image_url, created_at
            FROM products
            ORDER BY id
        """)

        products = []
        for row in cursor.fetchall():

            products.append({
                'id': row[0],
                'name': row[1],
                'cost_price': float(row[2]),
                'sell_price': float(row[3]),
                'price': float(row[3]),
                'category': row[4],
                'image_url': row[5] if row[5] else 'placeholder.jpg',
                'created_at': row[6].isoformat() if row[6] else None
            })

        cursor.close()
        db.close()

        return jsonify({
            'status': 'success',
            'products': products,
            'count': len(products)
        })

    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@app.route('/api/orders')
def get_orders():
    """Get all orders with customer info (requires customers table)"""
    try:
        db = get_db_connection()
        cursor = db.cursor()

        # Check if customers table exists, if not just return basic order info
        cursor.execute("SHOW TABLES LIKE 'customers'")
        has_customers_table = cursor.fetchone() is not None

        if has_customers_table:
            cursor.execute("""
                SELECT o.id, c.name, c.email, o.total_amount,
                       o.order_date, o.status
                FROM orders o
                LEFT JOIN customers c ON o.customer_id = c.id
                ORDER BY o.order_date DESC
            """)
        else:
            # Fallback: return without customer details
            cursor.execute("""
                SELECT id, customer_id, total_amount, order_date, status
                FROM orders
                ORDER BY order_date DESC
            """)

        orders = []
        for row in cursor.fetchall():
            if has_customers_table:
                orders.append({
                    'id': row[0],
                    'customer_name': row[1] or 'Unknown',
                    'customer_email': row[2] or 'Unknown',
                    'total_amount': float(row[3]),
                    'order_date': row[4].isoformat() if row[4] else None,
                    'status': row[5]
                })
            else:
                orders.append({
                    'id': row[0],
                    'customer_id': row[1],
                    'customer_name': f'Customer #{row[1]}',
                    'customer_email': 'N/A',
                    'total_amount': float(row[2]),
                    'order_date': row[3].isoformat() if row[3] else None,
                    'status': row[4]
                })

        cursor.close()
        db.close()

        return jsonify({
            'status': 'success',
            'orders': orders,
            'count': len(orders)
        })

    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@app.route('/checkout', methods=['POST'])
def checkout():
    """Process a checkout - creates/updates customer and order"""
    try:
        data = request.get_json()

        if not data:
            return jsonify({
                'status': 'error',
                'message': 'No data provided'
            }), 400

        # Extract customer information
        customer_name = data.get('name')
        customer_email = data.get('email')
        cart_items = data.get('cart', [])

        if not customer_name or not customer_email or not cart_items:
            return jsonify({
                'status': 'error',
                'message': 'Missing required fields'
            }), 400

        # Calculate total
        total_amount = sum(item.get('price', 0) * item.get('quantity', 0) for item in cart_items)

        db = get_db_connection()
        cursor = db.cursor()

        # Check if customers table exists
        cursor.execute("SHOW TABLES LIKE 'customers'")
        has_customers_table = cursor.fetchone() is not None

        customer_id = None

        if has_customers_table:
            # Insert or update customer
            cursor.execute("""
                SELECT id FROM customers WHERE email = %s
            """, (customer_email,))
            existing_customer = cursor.fetchone()

            if existing_customer:
                customer_id = existing_customer[0]
            else:
                cursor.execute("""
                    INSERT INTO customers (name, email) VALUES (%s, %s)
                """, (customer_name, customer_email))
                customer_id = cursor.lastrowid
        else:
            # Create a default customer_id (1) if no customers table
            customer_id = 1

        # Insert order with customer_id
        cursor.execute("""
            INSERT INTO orders (customer_id, total_amount, status)
            VALUES (%s, %s, %s)
        """, (customer_id, total_amount, 'pending'))

        order_id = cursor.lastrowid

        # Insert order items
        for item in cart_items:
            cursor.execute("""
                INSERT INTO order_items (order_id, product_id, quantity, price)
                VALUES (%s, %s, %s, %s)
            """, (order_id, item.get('id'), item.get('quantity'), item.get('price')))

        db.commit()
        cursor.close()
        db.close()

        return jsonify({
            'status': 'success',
            'message': 'Order placed successfully',
            'order_id': order_id,
            'customer_id': customer_id,
            'total': total_amount
        })

    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500
    
    ### dylans testing for password encryption ###

  
# Load user data
with open("users.json", "r") as f:
    users = json.load(f)

@app.route("/", methods=["GET"])
def home():
    return "<a href='/protected'>Go to protected page</a>"

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password").encode('utf-8')

        if username in users:
            stored_hash = users[username].encode('utf-8')
            if bcrypt.checkpw(password, stored_hash):
                session["username"] = username
                return redirect(url_for("protected"))

        return render_template("login.html", error="Invalid username or password")

    return render_template("login.html")

@app.route("/protected")
def protected():
    if "username" not in session:
        return redirect(url_for("login"))
    return render_template("protected.html", user=session["username"])
### end of dylans testing ###

if __name__ == '__main__':
    app.run(debug=True)
