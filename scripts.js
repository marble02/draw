const svg = d3.select('#svg');
let drawing = false;

let prev_coords;

document.addEventListener('click', event => {
    const e = event.target;
    if (e.className === 'clear') {
        svg.selectAll('*').remove();
    }
});

function draw_point() {
    if (!drawing) {
        return;
    }

    const colors = document.querySelector("#colors");
    const color = colors.options[colors.selectedIndex].value;

    const sizes = document.querySelector("#size");
    const s = sizes.options[sizes.selectedIndex].value;

    const coords = d3.mouse(this);

    svg.append('circle')
        .attr('cx', coords[0])
        .attr('cy', coords[1])
        .attr('r', s / 2)
        .style('fill', color);

    if (prev_coords) {
        svg.append('line')
            .attr('x1', prev_coords[0])
            .attr('x2', coords[0])
            .attr('y1', prev_coords[1])
            .attr('y2', coords[1])
            .style('stroke', color)
            .style('stroke-width', s)
    }

    prev_coords = coords;
};

svg.on('mousedown', () => {
    drawing = true;
});

svg.on('mouseup', () => {
    drawing = false;
    prev_coords = null;
});

svg.on('mousemove', draw_point);